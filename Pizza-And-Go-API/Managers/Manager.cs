using System;
using Pizza_And_Go_API.Resources;

namespace Pizza_And_Go_API.Managers
{
	public class Manager
	{
		protected ApplicationContext context;
		public Manager()
		{
			this.context = new ApplicationContext();
		}
	}
}

