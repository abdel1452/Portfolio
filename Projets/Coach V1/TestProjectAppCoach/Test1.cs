using MauiAppCoach.Core.Modele;

namespace TestProjectAppCoach
{
    [TestClass]
    public sealed class Test1
    {
        [TestMethod]
        public void TestMethodCalculImg()
        {
            // Arrange
            Profil profil = new Profil(1, 63, 171, 19);

            // Act
            double resultatTest = profil.GetImg();

            // Assert
            double resultatAttendu = 13.99;   // à adapter à la valeur exacte de ta formule
            double delta = 0.1;             // tolérance pour les doubles

            Assert.AreEqual(resultatAttendu, resultatTest, delta, "IMG incorrecte pour homme 19 ans, 63kg, 171cm.");
        }
    }
}
