<?php

namespace App\Entity;

use App\Repository\ArtistRepository;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=ArtistRepository::class)
 * @UniqueEntity(
 *      fields={"name"}, 
 *      message="Artist '{{ value }}' has already been registered."
 * )
 */
class Artist
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(
     *      min = 2,
     *      max = 255,
     *      minMessage = "Artist name must be at least {{ limit }} characters long.",
     *      maxMessage = "Artist name cannot be longer than {{ limit }} characters.",
     *      allowEmptyString = false
     * )
     * @Assert\NotBlank(
     *      message = "You must provide a name."
     * )
     * @Assert\NotNull(
     *      message = "You must provide a name."
     * )
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Assert\Length(
     *      min = 10,
     *      minMessage = "Description must be at least {{ limit }} characters long.",
     *      allowEmptyString = false
     * )
     * @Assert\NotBlank(
     *      message = "You must provide a description."
     * )
     * @Assert\NotNull(
     *      message = "You must provide a description."
     * )
     */
    private $description;

    /**
     * @ORM\Column(type="text")
     * @Assert\Length(
     *      min = 10,
     *      minMessage = "Bio must be at least {{ limit }} characters long.",
     *      allowEmptyString = false
     * )
     * @Assert\NotBlank(
     *      message = "You must provide a bio."
     * )
     * @Assert\NotNull(
     *      message = "You must provide a bio."
     * )
     */
    private $bio;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Url(
     *      message = "{{ value }} is not a valid url."
     * )
     * @Assert\NotBlank(
     *      message = "You must provide an url."
     * )
     * @Assert\NotNull(
     *      message = "You must provide an url."
     * )
     */
    private $photo;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(string $bio): self
    {
        $this->bio = $bio;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }
}
