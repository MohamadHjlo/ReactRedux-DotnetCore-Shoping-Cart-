using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpaReduxDotNet.Migrations
{
    public partial class AddQuantityPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "ProductToCarts",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "ProductToCarts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "ProductToCarts");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "ProductToCarts");
        }
    }
}
