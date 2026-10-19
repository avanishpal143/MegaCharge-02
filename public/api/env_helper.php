<?php
/**
 * Helper to load environment variables from .env file or server environment
 */
function get_config_var($key, $default = '') {
    static $envCache = null;

    if ($envCache === null) {
        $envCache = [];
        $candidates = [
            __DIR__ . '/../.env',
            __DIR__ . '/../../.env',
            __DIR__ . '/.env',
            dirname($_SERVER['DOCUMENT_ROOT'] ?? '') . '/.env'
        ];

        foreach ($candidates as $filePath) {
            if ($filePath && file_exists($filePath) && is_readable($filePath)) {
                $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                foreach ($lines as $line) {
                    $line = trim($line);
                    if ($line === '' || str_starts_with($line, '#')) {
                        continue;
                    }
                    if (str_contains($line, '=')) {
                        list($k, $v) = explode('=', $line, 2);
                        $k = trim($k);
                        $v = trim($v);
                        // Remove surrounding quotes
                        if ((str_starts_with($v, '"') && str_ends_with($v, '"')) ||
                            (str_starts_with($v, "'") && str_ends_with($v, "'"))) {
                            $v = substr($v, 1, -1);
                        }
                        $envCache[$k] = $v;
                    }
                }
                break;
            }
        }
    }

    if (isset($_ENV[$key]) && $_ENV[$key] !== '') {
        return $_ENV[$key];
    }

    $val = getenv($key);
    if ($val !== false && $val !== '') {
        return $val;
    }

    if (isset($envCache[$key])) {
        return $envCache[$key];
    }

    return $default;
}
