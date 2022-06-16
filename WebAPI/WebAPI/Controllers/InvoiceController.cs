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
        [HttpPost("addNewInvoice")]
        public IActionResult AddNewInvoice([FromForm] int pibSentFrom, [FromForm] int pibSentTo, [FromForm] DateTime dateOfCreation,
                                            [FromForm] DateTime paymentDeadline, [FromForm] double paymentAmount, 
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
            invoice.paymentAmount = paymentAmount;
            invoice.invoiceType = invoiceType;
            invoice.name = name;
            invoice.pricePerUnit = pricePerUnit;
            invoice.unitType = unitType;
            invoice.amount = amount;
            

            invoice2.id = invoices.OrderByDescending(invoice => invoice.id).First().id + 1;
            invoice2.pibSentFrom = pibSentFrom;
            invoice2.pibSentTo = pibSentTo;
            invoice2.dateOfCreation = dateOfCreation;
            invoice2.paymentDeadline = paymentDeadline;
            invoice2.paymentAmount = paymentAmount;
            invoice2.invoiceType = invoiceTypeTo;
            invoice2.name = name;
            invoice2.pricePerUnit = pricePerUnit;
            invoice2.unitType = unitType;
            invoice2.amount = amount;

            invoices.Add(invoice);
            invoices.Add(invoice2);
            return Ok(invoice);
        }


        //[HttpPost("izmeniFakturu")]
        //public IActionResult izmeniFakturu([FromForm] int PIB, [FromForm] int PIB2, [FromForm] string datumGenerisanja, [FromForm] string datumPlacanja, [FromForm] double ukupnaCena, [FromForm] string tipFakture, [FromForm] string naziv, [FromForm] int cenaPoJediniciMere, [FromForm] string jedinicaMere, [FromForm] int kolicina, [FromForm] int id)
        //{
        //    if (proveraPib(PIB))
        //    {
        //        return Ok("PIB je u netacnom formatu!!!");
        //    }
        //    if (proveraPib(PIB2))
        //    {
        //        return Ok("PIB2 je u netacnom formatu!!!");
        //    }
        //    int pozicija = -1;
        //    for (int i = 0; i < fakture.Count; i++)
        //    {
        //        Faktura temp = fakture[i];
        //        if (temp.id == id)
        //        {
        //            pozicija = i;
        //            break;
        //        }
        //    }
        //    if (pozicija == -1)
        //    {
        //        return Ok("Nismo pronasli fakturu koju trazite");
        //    }
        //    Faktura fak = new Faktura();
        //    fak.id = id;
        //    fak.PIB = PIB;
        //    fak.PIB2 = PIB2;
        //    fak.datumGenerisanja = datumGenerisanja;
        //    fak.datumPlacanja = datumPlacanja;
        //    fak.ukupnaCena = ukupnaCena;
        //    fak.tipFakture = tipFakture;
        //    fak.naziv = naziv;
        //    fak.cenaPoJediniciMere = cenaPoJediniciMere;
        //    fak.jedinicaMere = jedinicaMere;
        //    fak.kolicina = kolicina;
        //    fakture[pozicija] = fak;
        //    return Ok(fak);
        //}
        

        //[HttpGet("bilans/{PIB}/{Od}/{Do}")]
        //public IActionResult bilans(double PIB, string Od, string Do)
        //{
        //    double ukupno = 0;
        //    DateTime Odd = Convert.ToDateTime(Od.Replace("%2F", "/"));
        //    DateTime Dod = Convert.ToDateTime(Do.Replace("%2F", "/"));
        //    List<Faktura> temp = new List<Faktura>();
        //    foreach (Faktura item in fakture)
        //    {
        //        DateTime ispitian = Convert.ToDateTime(item.datumGenerisanja);
        //        if (ispitian > Odd && ispitian < Dod)
        //        {
        //            temp.Add(item);
        //        }
        //    }
        //    foreach (Faktura item in temp)
        //    {
        //        if (item.PIB == PIB)
        //        {
        //            if (item.tipFakture == "ulazna")
        //            {
        //                ukupno += item.ukupnaCena;
        //            }
        //            else
        //            {
        //                ukupno -= item.ukupnaCena;
        //            }
        //        }
        //    }
        //    return Ok(ukupno);
        //}
        //[HttpGet("sveFakture/{strana}")]
        //public IActionResult sveFakture(int strana)
        //{
        //    List<Faktura> fakturaList = new List<Faktura>();
        //    for (int i = strana; i < strana + 10 && i < fakture.Count; i++)
        //    {
        //        fakturaList.Add(fakture[i]);
        //    }
        //    return Ok(fakturaList);
        //}
        //[HttpGet("{PIB}/{strana}")]
        //public IActionResult faktureZaJednuFirmu(double PIB, int strana)
        //{
        //    List<Faktura> fakturaList = new List<Faktura>();
        //    for (int i = strana; i < strana + 10 && i < fakture.Count; i++)
        //    {
        //        if (fakture[i].PIB == PIB || fakture[i].PIB2 == PIB)
        //        {
        //            fakturaList.Add(fakture[i]);
        //        }

        //    }
        //    return Ok(fakturaList);
        //}


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

