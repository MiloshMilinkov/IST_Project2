namespace WebAPI.Models
{
    public class InvoiceData
    {
        public string name { get; set; }
        public double pricePerUnit { get; set; }
        public string unitOfMeasurement { get; set; }
        public double amount { get; set; }
    }
}
