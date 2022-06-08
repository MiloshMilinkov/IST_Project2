namespace WebAPI.Models
{
    public class Invoice:InvoiceData
    {
        public int pibRecieved { get; set; }
        public int pibDestination { get; set; }
        public string dateOfCreation { get; set; }
        public string paymentDeadline { get; set; }
        public double paymentAmount { get; set; }
        public string invoiceType { get; set; }
        public Invoice(string name,double pricePerUnit,string unitOfMeasurement, double amount)
        {
            this.name = name;
            this.pricePerUnit = pricePerUnit;
            this.unitOfMeasurement=unitOfMeasurement;
            this.amount = amount;
        }
        
    }
}
