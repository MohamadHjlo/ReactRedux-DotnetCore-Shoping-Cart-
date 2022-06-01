using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SpaReactDotNet;
using SpaReactDotNet.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<SpaReactDotNetContext>(option =>
{
    option.UseSqlServer(@"Data Source=MOHAMAD;Initial Catalog=ReactDotNetSpa_DB;Integrated Security=true;MultipleActiveResultSets=true");
});
builder.Services.AddControllersWithViews().AddFluentValidation(
                fv => fv.RegisterValidatorsFromAssemblyContaining<ModelValidator>()
            ); 

var app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
