using System;
using System.ServiceProcess;
using System.Threading;
using Predictor.Nancy;
using Predictor.Properties;
using Predictor.SignalR;
using Microsoft.AspNet.SignalR.Client;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Hosting;
using Nancy.Owin;
using Owin;

namespace Predictor.Installer
{
    public partial class WinService : ServiceBase
    {
        IDisposable host { get; set; }

        public void Start()
        {
            var siteUrl = Settings.Default.SiteUrl;
            var portNumber = Settings.Default.PortNumber;

            var uri = string.Format("http://*:{0}{1}", portNumber, siteUrl);

            const string url = "http://localhost:10000";
            StartOptions options = new StartOptions();
            options.Urls.Add(string.Format("http://{0}:10000", Environment.MachineName));
            options.Urls.Add("http://localhost:10000/");
            options.Urls.Add(uri);

            host = WebApp.Start<Startup>(options);

            var hubConnection = new HubConnection(url);
            var hubProxy = hubConnection.CreateHubProxy("MyHub");

            hubConnection.Start().ContinueWith(task =>
            {

            }).Wait();

            var timer = new Timer(x =>
            {
                if (ConnectionMapping.Count <= 1) return;

                hubProxy.Invoke("Send").Wait();
            }, null, 0, 2000);

        }

        public new void Stop()
        {
            host.Dispose();

            Thread.Sleep(1500);
        }

        protected override void OnStart(string[] args)
        {
            Start();
        }

        protected override void OnStop()
        {
            Stop();
        }

    }

    class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            app.MapSignalR();
            app.UseNancy(Configuration);
        }

        private static void Configuration(NancyOptions nancyOptions)
        {
            // Make sure to reference nancy project to get the right bootstrapper!

            nancyOptions.Bootstrapper = new Bootstrapper();
        }
    }
}
