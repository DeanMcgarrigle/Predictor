using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration.Install;
using System.Linq;
using System.Threading.Tasks;
using Predictor.Properties;

namespace Predictor
{
    [RunInstaller(true)]
    public partial class ProjectInstaller : System.Configuration.Install.Installer
    {
        public ProjectInstaller()
        {
            InitializeComponent();

            winServiceInstaller.DisplayName = Settings.Default.DisplayName;
            winServiceInstaller.Description = Settings.Default.Description;
            winServiceInstaller.ServiceName = Settings.Default.ServiceName;
        }

        private void winServiceProcessInstaller_AfterInstall(object sender, InstallEventArgs e)
        {

        }
    }
}
