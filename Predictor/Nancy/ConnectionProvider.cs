using System.Data.SqlClient;
using Predictor.Properties;
using MachSecure.BusinessObjects;

namespace Predictor.Nancy
{
    public class ConnectionProvider
    {
        public static SqlConnectionStringBuilder ConnectionString(string dbName)
        {
            return new SqlConnectionStringBuilder
            {
                DataSource = Settings.Default.DBServer,
                IntegratedSecurity = false,
                InitialCatalog = dbName,
                UserID = Settings.Default.DBUser,
                Password = Encryption.Decrypt(Settings.Default.DBPassword)
            };

        }
    }
}
