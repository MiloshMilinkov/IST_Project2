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
              new Enterprise { pib=100000000,nameOfPR="Boban",phoneNumber="076069544",
                                                 email="boban@gmail.com",corpName="Emmi",corpAddress="Centar Grada"}
        };
        
        
        [HttpGet("GetAllEnterprises")]
        public IActionResult showAllEnterprises()
        {
            return Ok(enterprises.OrderBy(enterprise=>enterprise.pib).ThenBy(enterprise => enterprise.corpName));
        }

        [HttpPost("AddEnterprise")]
        public IActionResult AddNewEnterprise([FromForm] string nameOfPR, [FromForm] string phoneNumber,
                                         [FromForm] string email, [FromForm] string corpName,
                                         [FromForm] string corpAddress)
        {
                Enterprise enterprise = new Enterprise();
                enterprise.pib = enterprises.OrderByDescending(enterprise => enterprise.pib).First().pib + 1;
                enterprise.nameOfPR = nameOfPR;
                enterprise.phoneNumber = phoneNumber;
                enterprise.email = email;
                enterprise.corpName = corpName;
                enterprise.corpAddress = corpAddress;
                enterprises.Add(enterprise);
                return Ok(enterprise);
            
        }

        [HttpGet("filterEnterprisesByPIB")]
        public IActionResult FilterByEnteprisPIB(string filterData)
        {
            var data = enterprises.Where(enterprise =>  enterprise.pib.ToString().Contains(filterData.ToString()))
                .OrderBy(enterprise => enterprise.pib)
                .Select(enterprise => enterprise);
            return Ok(data);
        }

        [HttpGet("filterEnterprisesByName/{Name}")]
        public IActionResult FilterPreduzece( string Name)
        {
            var data = enterprises.Where(enterprise =>  enterprise.corpName.Contains(Name));
            if (data == null)
            {
                return NotFound("Page not found");
            }
            return Ok(data);
        }

        [HttpPost("EditEnterprise/{prop}")]
        public IActionResult EditEnterprise([FromForm] string nameOfPR, [FromForm] string phoneNumber,
                                             [FromForm] string email, [FromForm] string corpName,
                                             [FromForm] string corpAddress, int prop)                                     
        {
            var enterprise = enterprises.FirstOrDefault(enterprise => enterprise.pib == prop);
            if (enterprise != null)
            {
                enterprise.pib = enterprise.pib;
                enterprise.nameOfPR = nameOfPR;
                enterprise.phoneNumber = phoneNumber;
                enterprise.email = email;
                enterprise.corpName = corpName;
                enterprise.corpAddress = corpAddress;
                return Ok(enterprise);
            }
            return NotFound("Enterprise not found!");
        }

        
    }
    
   
        
}
