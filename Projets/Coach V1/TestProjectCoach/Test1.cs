using MauiAppCoach.Core.Modele;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TestProjectCoach
{
    [TestClass]
    public sealed class Test1
    {
        [TestMethod]
        public void TestImg()
        {
            // Arrange
            Profil profil = new Profil(1, 70, 175, 25);

            // Act
            double resultatTest = profil.GetImg();

            // Assert
            double resultatAttendu = 14.81;   // à adapter à la valeur exacte de ta formule
            double delta = 0.01;             // tolérance pour les doubles

            Assert.AreEqual(resultatAttendu, resultatTest, delta,
                "IMG incorrecte pour homme 25 ans, 70kg, 175cm.");
        }
    }
}
