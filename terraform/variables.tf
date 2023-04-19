variable "vercel_api_token" {
  type      = string
  sensitive = true
}

variable "otp_secret_production" {
  type      = string
  sensitive = true
}

variable "otp_secret_dev_preview" {
  type      = string
  sensitive = true
}

variable "otp_user" {
  type      = string
  sensitive = true
}

variable "otp_service" {
  type      = string
  sensitive = true
}

variable "github_token" {
  type      = string
  sensitive = true
}

variable "database_host" {
  type      = string
  sensitive = true
}

variable "database_username" {
  type      = string
  sensitive = true
}

variable "database_password" {
  type      = string
  sensitive = true
}
