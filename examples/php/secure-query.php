<?php
declare(strict_types=1);

/**
 * Illustrative PDO query pattern.
 *
 * Configure the database connection using environment variables in a real
 * application. Never commit credentials or expose database errors to users.
 */

function findUserByEmail(PDO $pdo, string $email): ?array
{
    $statement = $pdo->prepare(
        'SELECT id, email, display_name FROM users WHERE email = :email LIMIT 1'
    );

    $statement->execute(['email' => $email]);
    $user = $statement->fetch(PDO::FETCH_ASSOC);

    return $user === false ? null : $user;
}

// Example connection setup (credentials are provided by the environment):
// $pdo = new PDO(
//     getenv('DB_DSN'),
//     getenv('DB_USER'),
//     getenv('DB_PASSWORD'),
//     [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
// );
//
// $user = findUserByEmail($pdo, $emailFromValidatedRequest);
