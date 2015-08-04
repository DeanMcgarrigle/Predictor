using Predictor.Properties;
using MachSecure.BusinessObjects;
using MachSecure.SEMS.DataObjects;
using Nancy;
using Nancy.Authentication.Forms;
using Nancy.ModelBinding;

namespace Predictor.Nancy.Modules
{
    public class LoginModule : NancyModule
    {
        public LoginModule()
            : base("/api")
        {
            Post["/login"] = LogInPost;

            Get["/logout"] = LogOut;

            Get["/user"] = _ =>
            {
                var user = Context.CurrentUser;

                return Response.AsJson(user);
            };
        }

        public dynamic LogInPost(dynamic o)
        {
            var loginParams = this.Bind<LoginObject>();
            SmartDBEntities.SetConnection(Settings.Default.DBServer,
                Settings.Default.DBName, Settings.Default.DBUser,
                Encryption.Decrypt((Settings.Default.DBPassword)));
            var user = User.LoadUser(loginParams.username);

            if (user == null)
            {
                return HttpStatusCode.Unauthorized;
            }

            if (user.Password == loginParams.password)
            {
                var token = user.RecordID;
                return this.LoginWithoutRedirect(token);
            }

            return HttpStatusCode.Unauthorized;

        }

        public dynamic LogOut(dynamic o)
        {
            return this.LogoutAndRedirect("../#/login");
        }
    }
}
