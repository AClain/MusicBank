<?php

namespace App\Entity;

use App\Repository\GenreRepository;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=GenreRepository::class)
 * @UniqueEntity(
 *      fields={"name"}, 
 *      message="{{ value }} has already been registered as a genre."
 * )
 */
class Genre
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(
     *      message = "You must provide a name."
     * )
     * @Assert\NotBlank(
     *      message = "You must provide a name."
     * )
     * @Assert\Length(
     *      min = 2,
     *      max = 255,
     *      minMessage = "Genre name must be at least {{ limit }} characters long.",
     *      maxMessage = "Genre name cannot be longer than {{ limit }} characters.",
     *      allowEmptyString = false
     * )
     */
    private $name;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
