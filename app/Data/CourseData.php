<?php

declare(strict_types=1);

namespace App\Data;

use App\Models\User;

use function is_string;

final class CourseData
{
    public function __construct(
        public ?string $name,
        public ?string $image_url,
        public string $visibility,
        public ?User $created_by,
        public ?User $updated_by,
    ) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public static function fromArray(array $attributes): self
    {
        assert(is_string($attributes['name']) || ! isset($attributes['name']));
        assert(is_string($attributes['image_url']) || ! isset($attributes['image_url']));
        assert(is_string($attributes['visibility']));
        assert($attributes['created_by'] instanceof User || ! isset($attributes['created_by']));
        assert($attributes['updated_by'] instanceof User || ! isset($attributes['updated_by']));

        return new self(
            $attributes['name'] ?? null,
            $attributes['image_url'] ?? null,
            $attributes['visibility'],
            $attributes['created_by'] ?? null,
            $attributes['updated_by'] ?? null,
        );
    }

    /**
     * @return array<string, mixed> $attributes
     */
    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'image_url' => $this->image_url,
            'visibility' => $this->visibility,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
        ];
    }
}
