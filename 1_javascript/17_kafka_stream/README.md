# Kafka Documentation



## Table of Contents
- [Introduction](#introduction)
- [Key Concepts](#key-concepts)
  - [Brokers](#brokers)
  - [Topics](#topics)
  - [Partitions](#partitions)
  - [Messages](#messages)
  - [Producers](#producers)
  - [Consumers](#consumers)
- [Docker Setup](#docker-setup)
- [Docker Commands](#docker-commands)
- [Running Kafka with Docker Compose](#running-kafka-with-docker-compose)
- [Conclusion](#conclusion)

## Introduction
Apache Kafka is a distributed streaming platform that allows you to publish and subscribe to streams of records. It is designed for high-throughput, fault tolerance, and scalability. This document provides an overview of Kafka's key concepts and how to set up a Kafka broker using Docker.

## Key Concepts

### Cluster
In the context of Apache Kafka, a cluster refers to a group of Kafka brokers that work together to manage and store data. 

### Brokers
A Kafka **broker** is a server that stores data and serves client requests. Kafka brokers work together as a cluster, and each broker in a cluster can handle requests independently. They store topics and their associated data.

### Topics
A **topic** is a category or feed name to which records are published. In Kafka, topics are multi-subscriber; a single topic can have multiple producers and consumers. Topics are identified by their names and are partitioned to allow scalability.

### Partitions
A **partition** is a division of a topic. Each partition is an ordered, immutable sequence of records. Kafka topics can have multiple partitions, which allow for parallel processing and improved performance. Each partition is associated with a unique ID.

### Messages
A **message** is the fundamental unit of data in Kafka. It consists of a key, value, and optional metadata (such as timestamps and headers). Messages within a partition are stored in the order they are received.

### Producers
A **producer** is an application that publishes messages to a Kafka topic. Producers send records to topics, and they can specify the partition in which a record should be stored.

### Consumers
A **consumer** is an application that subscribes to topics and processes the published messages. Consumers can be part of a consumer group, which allows them to share the workload of processing messages from partitions.

## Docker Setup
To run Kafka in a Docker environment, you'll need Docker and Docker Compose installed on your machine. Kafka can be set up easily using a Docker Compose file that defines the services needed (Kafka and Zookeeper).

## Docker Commands

### Run Kafka container:
    ```docker-compose -f ./docker-compose.yml up --build```

### Run Express API
    ```node ./src/app.js```