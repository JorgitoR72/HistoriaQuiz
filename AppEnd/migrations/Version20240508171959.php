<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240508171959 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE answers (id INT AUTO_INCREMENT NOT NULL, question_id INT NOT NULL, correct TINYINT(1) NOT NULL, content LONGTEXT NOT NULL, INDEX IDX_50D0C6061E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE games (id INT AUTO_INCREMENT NOT NULL, typegame_id INT NOT NULL, user_id INT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, INDEX IDX_FF232B313E6B55BE (typegame_id), INDEX IDX_FF232B31A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE levels (id INT AUTO_INCREMENT NOT NULL, id_game_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, INDEX IDX_9F2A64193A127075 (id_game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE questions (id INT AUTO_INCREMENT NOT NULL, id_game_id INT NOT NULL, id_level_id INT NOT NULL, content LONGTEXT NOT NULL, INDEX IDX_8ADC54D53A127075 (id_game_id), INDEX IDX_8ADC54D5F6AA732 (id_level_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE typegame (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE answers ADD CONSTRAINT FK_50D0C6061E27F6BF FOREIGN KEY (question_id) REFERENCES questions (id)');
        $this->addSql('ALTER TABLE games ADD CONSTRAINT FK_FF232B313E6B55BE FOREIGN KEY (typegame_id) REFERENCES typegame (id)');
        $this->addSql('ALTER TABLE games ADD CONSTRAINT FK_FF232B31A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE levels ADD CONSTRAINT FK_9F2A64193A127075 FOREIGN KEY (id_game_id) REFERENCES games (id)');
        $this->addSql('ALTER TABLE questions ADD CONSTRAINT FK_8ADC54D53A127075 FOREIGN KEY (id_game_id) REFERENCES games (id)');
        $this->addSql('ALTER TABLE questions ADD CONSTRAINT FK_8ADC54D5F6AA732 FOREIGN KEY (id_level_id) REFERENCES levels (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE answers DROP FOREIGN KEY FK_50D0C6061E27F6BF');
        $this->addSql('ALTER TABLE games DROP FOREIGN KEY FK_FF232B313E6B55BE');
        $this->addSql('ALTER TABLE games DROP FOREIGN KEY FK_FF232B31A76ED395');
        $this->addSql('ALTER TABLE levels DROP FOREIGN KEY FK_9F2A64193A127075');
        $this->addSql('ALTER TABLE questions DROP FOREIGN KEY FK_8ADC54D53A127075');
        $this->addSql('ALTER TABLE questions DROP FOREIGN KEY FK_8ADC54D5F6AA732');
        $this->addSql('DROP TABLE answers');
        $this->addSql('DROP TABLE games');
        $this->addSql('DROP TABLE levels');
        $this->addSql('DROP TABLE questions');
        $this->addSql('DROP TABLE typegame');
        $this->addSql('DROP TABLE user');
    }
}
