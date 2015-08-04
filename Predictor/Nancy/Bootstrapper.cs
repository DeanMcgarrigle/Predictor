using System;
using System.IO;
using Predictor.Nancy.Modules;
using Nancy;
using Nancy.Authentication.Forms;
using Nancy.Bootstrapper;
using Nancy.Conventions;
using Nancy.Responses.Negotiation;
using Nancy.TinyIoc;

namespace Predictor.Nancy
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
            Conventions.ViewLocationConventions.Add((viewName, model, context) => string.Concat(@"Nancy/Views/", viewName));


        }

        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);

            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("build"));
        }

        protected override NancyInternalConfiguration InternalConfiguration
        {
            get
            {
                return NancyInternalConfiguration.WithOverrides(x => x.ResponseProcessors = new[]
                {
                    typeof(ViewProcessor),
                    typeof(JsonProcessor),
                    typeof(XmlProcessor)
                });
            }
        }

        protected override IRootPathProvider RootPathProvider
        {
            get { return new SelfHostRootPathProvider(); }
        }

        protected override void ConfigureRequestContainer(TinyIoCContainer container, NancyContext context)
        {
            base.ConfigureRequestContainer(container, context);
            container.Register<IUserMapper, DatabaseUser>();
        }

        protected override void RequestStartup(TinyIoCContainer container, IPipelines pipelines, NancyContext context)
        {
            base.RequestStartup(container, pipelines, context);

            var formsAuthConfiguration = new FormsAuthenticationConfiguration
            {
                RedirectUrl = "../login",
                DisableRedirect = true,
                UserMapper = container.Resolve<IUserMapper>(),
            };

            FormsAuthentication.Enable(pipelines, formsAuthConfiguration);
        }
    }

    public class SelfHostRootPathProvider : IRootPathProvider
    {
        public string GetRootPath()
        {
            return StaticConfiguration.IsRunningDebug
                ? Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", ".."))
                : AppDomain.CurrentDomain.BaseDirectory;
        }
    }
}
