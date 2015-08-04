using Nancy;

namespace Predictor.Nancy.Modules
{
    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            Get["/"] = Home;
        }

        private dynamic Home(dynamic o)
        {

            return View["index"];
        }
    }
}
