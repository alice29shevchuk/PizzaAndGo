using System;
namespace Pizza_And_Go_API.Models
{
	public class FeedBack
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public string Message { get; set; }
		public int Rating { get; set; }
		public bool isShow { get; set; }
	}
}

