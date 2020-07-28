<?php

namespace App\Entity;

use App\Repository\TrackRepository;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=TrackRepository::class)
 */
class Track
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Album::class)
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotNull(
     *      message = "Track must be linked to an existing album."
     * )
     * @Assert\NotBlank(
     *      message = "Track must be linked to an existing album."
     * )
     */
    private $album;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(
     *      message = "You must provide a name for the track"
     * )
     * @Assert\NotBlank(
     *      message = "You must provide a name for the track."
     * )
     * @Assert\Length(
     *      min = 2,
     *      max = 255,
     *      minMessage = "Track name must be at least {{ limit }} characters long.",
     *      maxMessage = "Track name cannot be longer than {{ limit }} characters.",
     *      allowEmptyString = false
     * )
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotNull(
     *      message = "You must provide a track number."
     * )
     * @Assert\NotBlank(
     *      message = "You must provide a track number."
     * )
     * @Assert\Type(
     *     type="integer",
     *     message="{{ value }} is not a valid {{ type }}."
     * )
     * @Assert\Positive(
     *      message = "Track number must be higher than 0."
     * )
     */
    private $track_no;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAlbum(): ?Album
    {
        return $this->album;
    }

    public function setAlbum(?Album $album): self
    {
        $this->album = $album;

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

    public function getTrackNo(): ?int
    {
        return $this->track_no;
    }

    public function setTrackNo($track_no): self
    {
        $this->track_no = $track_no;

        return $this;
    }
}
