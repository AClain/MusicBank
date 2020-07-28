<?php

namespace App\Entity;

use App\Repository\AlbumRepository;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=AlbumRepository::class)
 */
class Album
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Artist::class)
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotNull(
     *      message = "Album must be linked to an existing artist."
     * )
     * @Assert\NotBlank(
     *      message = "Album must be linked to an existing artist."
     * )
     */
    private $artist;

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
     *      minMessage = "Album name must be at least {{ limit }} characters long.",
     *      maxMessage = "Album name cannot be longer than {{ limit }} characters.",
     *      allowEmptyString = false
     * )
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotNull(
     *      message = "You must provide a description."
     * )
     * @Assert\NotBlank(
     *      message = "You must provide a description."
     * )
     * @Assert\Length(
     *      min = 10,
     *      minMessage = "Album description must be at least {{ limit }} characters long.",
     *      allowEmptyString = false
     * )
     */
    private $description;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotNull(
     *      message = "You must provide the album cover. (large)"
     * )
     * @Assert\NotBlank(
     *      message = "You must provide the album cover. (large)"
     * )
     * @Assert\Url(
     *      message = "{{ value }} is not a valid url."
     * )
     */
    private $cover;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotNull(
     *      message = "You must provide the album cover. (small))"
     * )
     * @Assert\NotBlank(
     *      message = "You must provide the album cover. (small)"
     * )
     * @Assert\Url(
     *      message = "{{ value }} is not a valid url."
     * )
     */
    private $cover_small;

    /**
     * @ORM\Column(type="string", length=55)
     * @Assert\NotNull(
     *      message = "You must provide the album release date."
     * )
     * @Assert\NotBlank(
     *      message = "You must provide the album release date."
     * )
     * @Assert\Date(
     *      message = "{{ value }} is not a valid date. (YYYY-MM-DD)"
     * )
     */
    private $release_date;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $popularity;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArtist(): ?Artist
    {
        return $this->artist;
    }

    public function setArtist(?Artist $artist): self
    {
        $this->artist = $artist;

        return $this;
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

    public function getCover(): ?string
    {
        return $this->cover;
    }

    public function setCover(string $cover): self
    {
        $this->cover = $cover;

        return $this;
    }

    public function getCoverSmall(): ?string
    {
        return $this->cover_small;
    }

    public function setCoverSmall(string $cover_small): self
    {
        $this->cover_small = $cover_small;

        return $this;
    }

    public function getReleaseDate()
    {
        return $this->release_date;
    }

    public function setReleaseDate(string $release_date): self
    {
        $this->release_date = $release_date;

        return $this;
    }

    public function getPopularity(): ?int
    {
        return $this->popularity;
    }

    public function setPopularity(?int $popularity): self
    {
        $this->popularity = $popularity;

        return $this;
    }
}
