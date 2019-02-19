namespace LetsGetItTogetherServices.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string adminEmail { get; set; }
        public int timeToLive { get; set; }
        public string sendGridKey { get; set; }
    }
}