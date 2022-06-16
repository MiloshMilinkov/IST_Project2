namespace WebAPI.Models
{
    public class Invoice:InvoiceData
    {
        public int id { get; set; }
        public int pibSentFrom { get; set; }
        public int pibSentTo { get; set; }
        public DateTime dateOfCreation { get; set; }
        public DateTime paymentDeadline { get; set; }
        public double paymentAmount { get; set; }
        public string invoiceType { get; set; }
        public string name { get; set; }
        public double pricePerUnit { get; set; }
        public string unitType { get; set; }
        public int amount { get; set; }



    }
}
