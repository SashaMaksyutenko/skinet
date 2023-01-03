using API.Helpers;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using API.Middleware;
using API.Extensions;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(x=> 
x.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddSingleton<IConnectionMultiplexer>(c=>{
    var configuration=ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"),true);
    return ConnectionMultiplexer.Connect(configuration);

});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle//
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddApplicationServices();
builder.Services.AddSwaggerDocumentation();
builder.Services.AddAutoMapper(typeof(MappingProfiles));
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: "AllowOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
           .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
var app = builder.Build();
var services = builder.Services.BuildServiceProvider();
var loggerFactory = services.GetRequiredService<ILoggerFactory>();
try
{
    var context = services.GetRequiredService<StoreContext>();
    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context,loggerFactory);
}
catch(Exception ex)
{
    var logger = loggerFactory.CreateLogger<Program>();
    logger.LogError(ex, "An error occured during migration");
}  

app.UseCors("AllowOrigin");
app.UseMiddleware<ExceptionMiddleware>();  
// Configure the HTTP request pipeline.
app.UseStatusCodePagesWithReExecute("/errors/{0}");
app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();
app.UseAuthorization();
app.UseSwaggerDocumentation();
app.MapControllers();
app.Run();

