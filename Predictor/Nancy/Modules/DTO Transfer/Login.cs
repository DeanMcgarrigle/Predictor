using System.Collections.Generic;
using Nancy.Security;

namespace Predictor.Nancy.Modules
{
    public class LoginObject
    {
        public string username { get; set; }
        public string password { get; set; }
    }
    public class AuthenticatedUser : IUserIdentity
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public IEnumerable<string> Claims { get; set; }
    }
}
