provider "vercel" {
  api_token = var.vercel_api_token
}

resource "vercel_project" "reading_list" {
  name      = "reading-list"
  framework = "nextjs"
  git_repository = {
    production_branch = "main"
    repo              = "jpedroh/reading-list"
    type              = "github"
  }
}

resource "vercel_project_domain" "domain" {
  project_id = vercel_project.reading_list.id
  domain     = "reading-list.jpedroh.dev"
}

resource "vercel_project_environment_variable" "otp_secret_production" {
  project_id = vercel_project.reading_list.id
  key        = "OTP_SECRET"
  value      = var.otp_secret_production
  target     = ["production"]
}

resource "vercel_project_environment_variable" "otp_secret_dev_preview" {
  project_id = vercel_project.reading_list.id
  key        = "OTP_SECRET"
  value      = var.otp_secret_dev_preview
  target     = ["development", "preview"]
}

resource "vercel_project_environment_variable" "database_host" {
  project_id = vercel_project.reading_list.id
  key        = "DATABASE_HOST"
  value      = var.database_host
  target     = ["production"]
}

resource "vercel_project_environment_variable" "database_username" {
  project_id = vercel_project.reading_list.id
  key        = "DATABASE_USERNAME"
  value      = var.database_username
  target     = ["production"]
}

resource "vercel_project_environment_variable" "database_password" {
  project_id = vercel_project.reading_list.id
  key        = "DATABASE_PASSWORD"
  value      = var.database_password
  target     = ["production"]
}

resource "vercel_project_environment_variable" "otp_user" {
  project_id = vercel_project.reading_list.id
  key        = "OTP_USER"
  value      = var.otp_user
  target     = ["production", "development", "preview"]
}

resource "vercel_project_environment_variable" "otp_service" {
  project_id = vercel_project.reading_list.id
  key        = "OTP_SERVICE"
  value      = var.otp_service
  target     = ["production", "development", "preview"]
}
