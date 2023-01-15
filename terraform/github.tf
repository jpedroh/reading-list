provider "github" {
  token = var.github_token
}

resource "github_actions_secret" "database_url" {
  repository      = "reading-list"
  secret_name     = "database_url"
  plaintext_value = var.database_url_dev_preview
}

resource "github_actions_secret" "otp_secret" {
  repository      = "reading-list"
  secret_name     = "otp_secret"
  plaintext_value = var.otp_secret_dev_preview
}

resource "github_actions_secret" "otp_user" {
  repository      = "reading-list"
  secret_name     = "otp_user"
  plaintext_value = var.otp_user
}

resource "github_actions_secret" "otp_service" {
  repository      = "reading-list"
  secret_name     = "otp_service"
  plaintext_value = var.otp_service
}
