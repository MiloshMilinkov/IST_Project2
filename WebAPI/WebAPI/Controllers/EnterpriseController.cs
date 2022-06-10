using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnterpriseController : Controller
    {
        static List<Enterprise> enterprises = new List<Enterprise>()
        {
              new Enterprise { pib=10000000,nameOfPR="Boban",phoneNumber="076069544",
                                                 email="boban@gmail.com",corpName="Emmi",corpAddress="Centar Grada"}
        };
        static List<Invoice> invoices = new List<Invoice>();
        
        [HttpGet("GetAllEnterprises")]
        public IActionResult showAllEnterprises()
        {
            return Ok(enterprises.OrderBy(enterprise=>enterprise.pib).ThenBy(enterprise => enterprise.corpName));
        }

        [HttpPost("AddEnterprise")]
        public IActionResult AddNewEnterprise([FromForm] string nameOfPR, [FromForm] string phoneNubmer,
                                         [FromForm] string email, [FromForm] string corpName,
                                         [FromForm] string corpAddress)
        {
            Enterprise enterprise = new Enterprise();
                enterprise.pib = enterprises.OrderByDescending(enterprise => enterprise.pib).First().pib + 1;
                enterprise.nameOfPR = nameOfPR;
                enterprise.phoneNumber = phoneNubmer;
                enterprise.email = email;
                enterprise.corpName = corpName;
                enterprise.corpAddress = corpAddress;
                enterprises.Add(enterprise);
                return Ok(enterprise);
            
        }

        [HttpGet("filterEnterprises")]
        public IActionResult FilterByEnteprisename(string filterData)
        {
            var data = enterprises.Where(enterprise => enterprise.corpName.Contains(filterData) || 
                                         enterprise.pib.ToString().Contains(filterData.ToString()))
                .OrderBy(enterprise => enterprise.corpName)
                .ThenBy(enterprise => enterprise.pib)
                .Select(enterprise => enterprise);
            return Ok(data);
        }

        [HttpPost("AddNewInvoice")]
        public IActionResult AddNewInvocie([FromForm] int pibRecieved, [FromForm] int pibDestination,
                                        [FromForm] string dateOfCreation, [FromForm] string paymentDeadline,
                                        [FromForm] string invoiceType, [FromForm] double paymentAmount)
        {
            Invoice invoice = new Invoice();
            invoice.pibRecieved = pibRecieved;
            invoice.pibDestination = pibDestination;
            invoice.dateOfCreation = dateOfCreation;
            invoice.paymentDeadline = paymentDeadline;
            invoice.invoiceType = invoiceType;
            invoice.paymentAmount = paymentAmount;
            invoices.Add(invoice);
            return Ok(invoice);

        }
    }
    
   
        
}
