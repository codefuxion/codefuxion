<?php
declare(strict_types=1);

/**
 * Reusable authentication security helpers.
 *
 * Call configureSecureSession() before session_start() and before output.
 * Store password hashes returned by hashPassword(), never plaintext passwords.
 */

function configureSecureSession(bool $isHttps): void
{
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');

    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function hashPassword(string $password): string
{
    if (strlen($password) < 12) {
        throw new InvalidArgumentException('Use a password with at least 12 characters.');
    }

    return password_hash($password, PASSWORD_DEFAULT);
}

function verifyPassword(string $password, string $storedHash): bool
{
    return password_verify($password, $storedHash);
}

/**
 * Call only after credentials have been verified successfully.
 */
function rotateSessionAfterLogin(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        throw new RuntimeException('Start the session before rotating its ID.');
    }

    if (!session_regenerate_id(true)) {
        throw new RuntimeException('Unable to rotate the session ID.');
    }
}

function createCsrfToken(): string
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        throw new RuntimeException('Start the session before creating a CSRF token.');
    }

    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

function verifyCsrfToken(?string $submittedToken): bool
{
    if (
        session_status() !== PHP_SESSION_ACTIVE ||
        !is_string($submittedToken) ||
        empty($_SESSION['csrf_token'])
    ) {
        return false;
    }

    return hash_equals($_SESSION['csrf_token'], $submittedToken);
}

// Example integration:
// configureSecureSession(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
// session_start();
// On successful login: rotateSessionAfterLogin();
// In a form: echo htmlspecialchars(createCsrfToken(), ENT_QUOTES, 'UTF-8');
// On POST: verifyCsrfToken($_POST['csrf_token'] ?? null);
