<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $image_url
 * @property string $visibility
 * @property User $created_by
 * @property User $updated_by
 */
final class Course extends Model
{
    protected $fillable = [
        'name',
        'image_url',
        'visibility',
        'created_by',
        'updated_by',
    ];
}
