import { DataSource } from "typeorm";

const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "sqlkibethh",
  database: "TypeGraphQL",
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.*"],
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
