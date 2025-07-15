# Socialpass 🚀

![Build](https://img.shields.io/github/actions/workflow/status/hemayar14/Socialpass/ci.yml?branch=main)
![Issues](https://img.shields.io/github/issues/hemayar14/Socialpass)
![Forks](https://img.shields.io/github/forks/hemayar14/Socialpass)
![Stars](https://img.shields.io/github/stars/hemayar14/Socialpass)
![License](https://img.shields.io/github/license/hemayar14/Socialpass)

> Socialpass is a modern social media automation platform built with NestJS, Redis, BullMQ, PostgreSQL, and MongoDB. It includes AI caption generation, platform schedulers, and an event-driven backend architecture.

## 🧱 Architecture
![Architecture Diagram](./docs/socialpass-architecture.png)

## 📚 Documentation

- Live Swagger: [`/api/docs`](http://localhost:3000/api/docs)
- Environments: `.env`, `.env.staging`, `.env.production`

...
A modern social media integration platform that provides unified APIs, analytics, and automation tools for managing multiple social networks.

## Features

- **Unified Social API**: Single integration point for Facebook, Instagram, Twitter, LinkedIn
- **Content Repurposing**: Automatically adapt content across platforms
- **Influencer Discovery**: AI-powered influencer matching
- **Real-time Analytics**: Engagement tracking across networks
- **Automated Moderation**: AI content filtering
- **Scheduled Publishing**: Calendar-based content planning
- **Enterprise Security**: SOC 2 compliant infrastructure

## Tech Stack

### Core Services
| Service | Technology | Purpose |
|---------|------------|---------|
| API | NestJS, TypeScript | Main application server |
| Worker | Node.js, BullMQ | Background processing |
| Web | React, Next.js | Admin dashboard |

### Infrastructure
- **Database**: PostgreSQL (TypeORM)
- **Message Broker**: Kafka
- **Cache**: Redis
- **Search**: ElasticSearch
- **Storage**: AWS S3
- **Containerization**: Docker
- **Orchestration**: Kubernetes

### Monitoring
- **Metrics**: Prometheus
- **Logging**: Loki
- **Tracing**: Jaeger
- **Alerting**: Alertmanager

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker 20.10+
- PNPM 8+

### Installation
```bash
# Clone repository
git clone https://github.com/socialpass/socialpass.git
cd socialpass

# Install dependencies
pnpm install

# Set up environment variables
cp apps/api/.env.example apps/api/.env
cp apps/worker/.env.example apps/worker/.env

# Start database
docker-compose up -d postgres

# Run migrations
pnpm migrate
