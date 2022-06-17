namespace WebAPI.Models
{
    public class Invoice
    {
        public int id { get; set; }
        public int pibSentFrom { get; set; }
        public int pibSentTo { get; set; }
        public string dateOfCreation { get; set; }
        public string paymentDeadline { get; set; }
        public double paymentAmount { get; set; }
        public string invoiceType { get; set; }
        public string name { get; set; }
        public double pricePerUnit { get; set; }
        public string unitType { get; set; }
        public int amount { get; set; }



    }
}
