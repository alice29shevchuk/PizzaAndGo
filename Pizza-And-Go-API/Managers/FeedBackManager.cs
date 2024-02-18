using System;
using Pizza_And_Go_API.Models;

namespace Pizza_And_Go_API.Managers
{
	public class FeedBackManager: Manager
    {
		public void AddFeedBack(FeedBack feedBack)
		{
			if(feedBack != null)
			{
				this.context.FeedBack.Add(feedBack);
				SaveChanges();
			}
		}

		public List<FeedBack> GetFeedBack()
		{
			return this.context.FeedBack.Where(x => x.isShow.Equals(true)).ToList();
		}

		public void DeleteFeedBack(int idForDelete)
		{
			var delete = this.context.FeedBack.Where(x => x.ID.Equals(idForDelete)).FirstOrDefault();
			if(delete != null)
			{
				this.context.FeedBack.Remove(delete);
				SaveChanges();
			}
		}

        //
        //	ADMIN
        //

        public List<FeedBack> GetFeedBacks()
        {
            return this.context.FeedBack.ToList();
        }

		public void UpdateFeedBack(FeedBack feedBackForUpdate)
		{
			var update = this.context.FeedBack.Where(x => x.ID.Equals(feedBackForUpdate.ID)).FirstOrDefault();
			if(update != null)
			{
				update.ID = feedBackForUpdate.ID;
				update.isShow = feedBackForUpdate.isShow;
				update.Message = feedBackForUpdate.Message;
				update.Name = feedBackForUpdate.Name;
				update.Rating = feedBackForUpdate.Rating;
				SaveChanges();
			}
		}
    }
}

