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

variable "database_url_production" {
  type      = string
  sensitive = true
}

variable "database_url_dev_preview" {
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
