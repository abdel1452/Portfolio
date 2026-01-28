using Xunit;

namespace MauiAppCoach.Tests;

public class ProfilTests
{
    [Fact]
    public void TestCalculIMG_Homme()
    {
        // Arrange
        Profil profil = new Profil(1, 70, 175, 25, "");

        // Act
        double img = profil.GetImg();

        // Assert
        Assert.Equal(16.95, Math.Round(img, 2));
    }

    [Fact]
    public void TestCalculIMG_Femme()
    {
        // Arrange
        Profil profil = new Profil(0, 60, 165, 30, "");

        // Act
        double img = profil.GetImg();

        // Assert
        Assert.Equal(27.95, Math.Round(img, 2));
    }

    [Fact]
    public void TestMessage_Homme_TropMaigre()
    {
        // Arrange - IMG < 15 pour un homme
        Profil profil = new Profil(1, 50, 180, 25, "");

        // Act
        string message = profil.GetMessage();

        // Assert
        Assert.Equal("Trop maigre.", message);
    }

    [Fact]
    public void TestMessage_Homme_Parfait()
    {
        // Arrange - IMG entre 15 et 20 pour un homme
        Profil profil = new Profil(1, 70, 175, 25, "");

        // Act
        string message = profil.GetMessage();

        // Assert
        Assert.Equal("Parfait.", message);
    }

    [Fact]
    public void TestMessage_Homme_Surpoids()
    {
        // Arrange - IMG >= 20 pour un homme
        Profil profil = new Profil(1, 100, 175, 25, "");

        // Act
        string message = profil.GetMessage();

        // Assert
        Assert.Equal("Surpoids.", message);
    }

    [Fact]
    public void TestMessage_Femme_TropMaigre()
    {
        // Arrange - IMG < 25 pour une femme
        Profil profil = new Profil(0, 45, 170, 25, "");

        // Act
        string message = profil.GetMessage();

        // Assert
        Assert.Equal("Trop maigre.", message);
    }

    [Fact]
    public void TestMessage_Femme_Parfait()
    {
        // Arrange - IMG entre 25 et 30 pour une femme
        Profil profil = new Profil(0, 60, 165, 30, "");

        // Act
        string message = profil.GetMessage();

        // Assert
        Assert.Equal("Parfait.", message);
    }

    [Fact]
    public void TestMessage_Femme_Surpoids()
    {
        // Arrange - IMG >= 30 pour une femme
        Profil profil = new Profil(0, 80, 165, 30, "");

        // Act
        string message = profil.GetMessage();

        // Assert
        Assert.Equal("Surpoids.", message);
    }

    [Fact]
    public void TestGetters()
    {
        // Arrange
        Profil profil = new Profil(1, 70, 175, 25, "");

        // Act & Assert
        Assert.Equal(1, profil.GetSexe());
        Assert.Equal(70, profil.GetPoids());
        Assert.Equal(175, profil.GetTaille());
        Assert.Equal(25, profil.GetAge());
        Assert.True(profil.GetImg() > 0);
        Assert.NotNull(profil.GetMessage());
    }

    [Fact]
    public void TestCalculIMG_Bordure_Homme_Parfait()
    {
        // Arrange - IMG dans la plage "Parfait" pour un homme (15-20)
        // Homme: 70kg, 175cm, 25 ans donne environ 16.95 (dans la plage)
        Profil profil = new Profil(1, 70, 175, 25, "");

        // Act
        double img = profil.GetImg();
        string message = profil.GetMessage();

        // Assert - Dans la plage "Parfait" (>= 15 et < 20)
        Assert.True(img >= 15);
        Assert.True(img < 20);
        Assert.Equal("Parfait.", message);
    }

    [Fact]
    public void TestCalculIMG_Bordure_Femme_Parfait()
    {
        // Arrange - IMG dans la plage "Parfait" pour une femme (25-30)
        Profil profil = new Profil(0, 60, 165, 30, "");

        // Act
        double img = profil.GetImg();
        string message = profil.GetMessage();

        // Assert - Dans la plage "Parfait" (>= 25 et < 30)
        Assert.True(img >= 25);
        Assert.True(img < 30);
        Assert.Equal("Parfait.", message);
    }
}
