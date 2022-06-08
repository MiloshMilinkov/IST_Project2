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
              new Enterprise { pib=10000000,nameOfPR="Boban",phoneNubmer="076069544",
                                                 email="boban@gmail.com",corpName="Emmi",corpAddress="Centar Grada"}
        };
       
        [HttpGet]
        public IActionResult showAllEnterprises()
        {
            return Ok(enterprises.OrderBy(enterprise=>enterprise.pib).ThenBy(enterprise => enterprise.corpName));
        }

        [HttpPost]
        public IActionResult AddNewEnterprise([FromForm] string nameOfPR, [FromForm] string phoneNubmer,
                                         [FromForm] string email, [FromForm] string corpName,
                                         [FromForm] string corpAddress)
        {
            Enterprise enterprise = new Enterprise();
                enterprise.pib = enterprises.OrderByDescending(enterprise => enterprise.pib).First().pib + 1;
                enterprise.nameOfPR = nameOfPR;
                enterprise.phoneNubmer = phoneNubmer;
                enterprise.email = email;
                enterprise.corpName = corpName;
                enterprise.corpAddress = corpAddress;
                enterprises.Add(enterprise);
                return Ok(enterprise);
            
        }

        [HttpGet("filter")]
        public IActionResult FilterByEnteprisename(string filterData)
        {
            var data = enterprises.Where(enterprise => enterprise.corpName.Contains(filterData) || 
                                         enterprise.pib.ToString().Contains(filterData.ToString()))
                .OrderBy(enterprise => enterprise.corpName)
                .ThenBy(enterprise => enterprise.pib)
                .Select(enterprise => enterprise);
            return Ok(data);
        }
    }
    
   
        // GET: EnterpriseController
    //    public ActionResult Index()
    //    {
    //        return View();
    //    }

    //    // GET: EnterpriseController/Details/5
    //    public ActionResult Details(int id)
    //    {
    //        return View();
    //    }

    //    // GET: EnterpriseController/Create
    //    public ActionResult Create()
    //    {
    //        return View();
    //    }

    //    // POST: EnterpriseController/Create
    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public ActionResult Create(IFormCollection collection)
    //    {
    //        try
    //        {
    //            return RedirectToAction(nameof(Index));
    //        }
    //        catch
    //        {
    //            return View();
    //        }
    //    }

    //    // GET: EnterpriseController/Edit/5
    //    public ActionResult Edit(int id)
    //    {
    //        return View();
    //    }

    //    // POST: EnterpriseController/Edit/5
    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public ActionResult Edit(int id, IFormCollection collection)
    //    {
    //        try
    //        {
    //            return RedirectToAction(nameof(Index));
    //        }
    //        catch
    //        {
    //            return View();
    //        }
    //    }

    //    // GET: EnterpriseController/Delete/5
    //    public ActionResult Delete(int id)
    //    {
    //        return View();
    //    }

    //    // POST: EnterpriseController/Delete/5
    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public ActionResult Delete(int id, IFormCollection collection)
    //    {
    //        try
    //        {
    //            return RedirectToAction(nameof(Index));
    //        }
    //        catch
    //        {
    //            return View();
    //        }
    //    }
    //}
}
