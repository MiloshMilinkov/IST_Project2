using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : Controller
    {
        static List<Invoice> invoices = new List<Invoice>()
        {
        new Invoice{ },

        };
        [HttpGet("showAllInvoices/{page}")]
        public IActionResult sveFakture(int page)
        {
            List<Invoice> tempinvoices = new List<Invoice>();
            for (int i = page; i < page+1  && i < invoices.Count; i++)
            {
                tempinvoices.Add(invoices[i]);
            }
            return Ok(tempinvoices);
        }
        [HttpGet("{PIB}/{page}")]
        public IActionResult faktureZaJednuFirmu(int PIB, int page)
        {
            List<Invoice> tempinvoices = new List<Invoice>();
            for (int i = page; i < page+1  && i < invoices.Count; i++)
            {
                if (invoices[i].pibSentFrom == PIB && invoices[i].invoiceType=="outgoing")
                {
                    tempinvoices.Add(invoices[i]);
                }
                if (invoices[i].pibSentTo == PIB && invoices[i].invoiceType == "ingoing")
                {
                    tempinvoices.Add(invoices[i]);
                }

            }
            return Ok(tempinvoices);
        }

        [HttpPost("addNewInvoice")]
        public IActionResult AddNewInvoice([FromForm] int pibSentFrom, [FromForm] int pibSentTo, [FromForm] string dateOfCreation,
                                            [FromForm] string paymentDeadline,
                                            [FromForm] string invoiceType, [FromForm] string name,
                                            [FromForm] int pricePerUnit, [FromForm] string unitType, 
                                            [FromForm] int amount)
        {
            if (validatePIB(pibSentFrom))
            {
                return Ok("Incorrect PIB from!");
            }
            if (validatePIB(pibSentTo))
            {
                return Ok("Incorrect PIB to!");
            }

            string invoiceTypeTo = "";
            if (invoiceType == "ingoing")
            {
                invoiceTypeTo = "outgoing";
            }
            else
            {
                invoiceTypeTo = "ingoing";
            }
            Invoice invoice = new Invoice();
            Invoice invoice2 = new Invoice();

            invoice.id = invoices.OrderByDescending(invoice => invoice.id).First().id + 1;
            invoice.pibSentFrom = pibSentFrom;
            invoice.pibSentTo = pibSentTo;
            invoice.dateOfCreation = dateOfCreation;
            invoice.paymentDeadline = paymentDeadline;
            invoice.paymentAmount = pricePerUnit*amount;
            invoice.invoiceType = invoiceType;
            invoice.name = name;
            invoice.pricePerUnit = pricePerUnit;
            invoice.unitType = unitType;
            invoice.amount = amount;
            

            invoice2.id = invoice.id + 1;
            invoice2.pibSentFrom = pibSentFrom;
            invoice2.pibSentTo = pibSentTo;
            invoice2.dateOfCreation = dateOfCreation;
            invoice2.paymentDeadline = paymentDeadline;
            invoice2.paymentAmount = pricePerUnit * amount;
            invoice2.invoiceType = invoiceTypeTo;
            invoice2.name = name;
            invoice2.pricePerUnit = pricePerUnit;
            invoice2.unitType = unitType;
            invoice2.amount = amount;

            invoices.Add(invoice);
            invoices.Add(invoice2);
            return Ok(invoice);
        }




        [HttpPost("editInvoice/{prop}")]
        public IActionResult izmeniFakturu( [FromForm] string dateOfCreation,
                                            [FromForm] string paymentDeadline,
                                            [FromForm] string invoiceType, [FromForm] string name,
                                            [FromForm] int pricePerUnit, [FromForm] string unitType,
                                            [FromForm] int amount, int prop)
        {
            string invoiceTypeTo = "";
            var invoice = invoices.FirstOrDefault(invoice => invoice.id == prop);
            if (invoice != null)
            {
               
                invoice.pibSentFrom = invoice.pibSentFrom;
                invoice.pibSentTo = invoice.pibSentTo;
                invoice.dateOfCreation = dateOfCreation;
                invoice.paymentDeadline = paymentDeadline;
                invoice.paymentAmount = pricePerUnit * amount;
                invoice.invoiceType = invoiceType;
                invoice.name = name;
                invoice.pricePerUnit = pricePerUnit;
                invoice.unitType = unitType;
                invoice.amount = amount;
                var invoice2 = invoices.FirstOrDefault(invoice2 => invoice2.pibSentFrom == invoice.pibSentFrom && 
                                                       invoice2.pibSentTo== invoice.pibSentTo && invoice2.id==invoice.id+1);
                if (invoice2 != null)
                {
                    
                    if (invoice.invoiceType == "ingoing")
                    {
                        invoiceTypeTo = "outgoing";
                    }
                    else
                    {
                        invoiceTypeTo = "ingoing";
                    }
                    invoice2.id = invoice.id+1 ;
                    invoice2.dateOfCreation = dateOfCreation;
                    invoice2.paymentDeadline = paymentDeadline;
                    invoice2.paymentAmount = pricePerUnit * amount;
                    invoice2.invoiceType = invoiceTypeTo;
                    invoice2.name = name;
                    invoice2.pricePerUnit = pricePerUnit;
                    invoice2.unitType = unitType;
                    invoice2.amount = amount;
                }
                    return Ok(invoice);
            }
            return NotFound("Invoice not found!");
        }
        private bool validatePIB(double PIB)
        {
            if (PIB > 99999999 && PIB < 1000000000)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        
    }
}

