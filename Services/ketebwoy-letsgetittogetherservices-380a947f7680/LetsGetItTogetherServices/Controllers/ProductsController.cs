using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Semantics3;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Cors;

namespace LetsGetItTogetherServices.Controllers
{
    [EnableCors("MyPolicy")]
    [Authorize]
    [ApiController]
    [Route("shop")]
    public class ProductsController : ControllerBase
    {
      //  private AmazonAuthentication _amazonAuth = new AmazonAuthentication();
    

        public ProductsController()
        {
            //_amazonAuth.AccessKey = "AKIAJNZJZUZHHJOJG2GQ";
            //_amazonAuth.SecretKey = "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";
        }

        [EnableCors("MyPolicy")]
        [AllowAnonymous]
        [HttpGet("products")]
        public string GetProducts(string search)
        {
           
            try
            {
                                             Products products = new Products("SEM3E7665A1467BB1C1BA1DDC0B42A9637C0",
                                              "YzY3NzAwMzZmOTM1ZWQ0M2Q2MTU5OTA0OWRkZjVlMDE");

                products.products_field("search", search);

                JObject hashProducts = products.get_products();

                return hashProducts.ToString();
            }
            catch (Exception ex)
            {
                var res = new JsonResult(ex); 
                return res.ToString();

            }


        }

        private static void ItemLookupRequest()//AmazonAuthentication authentication)
        {
           
        }
    

    private static void ItemSearchRequest1()//AmazonAuthentication authentication)
        {
           
        }

    private static void ItemSearchRequest2()//AmazonAuthentication authentication)
        {
           
        }

    private static void CustomItemSearchRequest1()//AmazonAuthentication authentication)
        {

        }

    private static void CustomItemSearchRequest2()//AmazonAuthentication authentication)
        {
      
        }

    private static void BrowseNodeLookupRequest1()//AmazonAuthentication authentication)
        {
          
        }

    private static void BrowseNodeLookupRequest2()//AmazonAuthentication authentication)
        {
         
        }

    private static void CreateCart1()//AmazonAuthentication authentication)
        {
           
        }
    }//end class
}//end namespace