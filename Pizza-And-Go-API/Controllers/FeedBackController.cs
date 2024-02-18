using System;
using Microsoft.AspNetCore.Mvc;
using Pizza_And_Go_API.Managers;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Controllers
{
    [ApiController]
    [Route("api/FeedBack")]
    public class FeedBackController
	{
		private FeedBackManager manager;
		public FeedBackController()
		{
			this.manager = new FeedBackManager();
		}

		[HttpGet]
		[Route("GetFeedBack")]
		public List<FeedBack> GetFeedBack()
		{
			return this.manager.GetFeedBack();
		}

		[HttpPost]
		[Route("AddFeedBack")]
		public void AddFeedBack(FeedBack feedBackForAdd)
		{
			this.manager.AddFeedBack(feedBackForAdd);
		}

		[HttpDelete]
		[Route("DeleteFeedBack")]
		public void DeleteFeedBack(int idForDelete)
		{
			this.manager.DeleteFeedBack(idForDelete);
		}

        //
        //	ADMIN
        //
        [HttpGet]
        [Route("GetFeedBacks")]
        public List<FeedBack> GetFeedBacks()
        {
            return this.manager.GetFeedBacks();
        }

		[HttpPost]
		[Route("UpdateFeedBack")]
		public void UpdateFeedBack(FeedBack feedBackForUpdate)
		{
			this.manager.UpdateFeedBack(feedBackForUpdate);
		}
    }
}

