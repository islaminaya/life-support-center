<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * @property string $id
 * @property string $name
 * @property string $image_url
 * @property string $visibility
 * @property User $created_by
 * @property User $updated_by
 */
final class Course extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'image_url',
        'visibility',
        'created_by',
        'updated_by',
    ];

    /**
     * @return HasMany<Batch, $this>
     */
    public function batches(): HasMany
    {
        return $this->hasMany(Batch::class)->latest('start_date');
    }

    protected static function booted(): void
    {
        self::creating(function (Course $course): void {
            if (! $course->id) {
                $course->id = (string) Str::uuid();
            }
        });
    }
}
