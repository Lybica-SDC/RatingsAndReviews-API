CREATE DATABASE RnR;
CREATE TABLE "reviews" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"date" VARCHAR(255) NOT NULL,
	"summary" VARCHAR(255) NOT NULL,
	"body" VARCHAR(255) NOT NULL,
	"recommend" BOOLEAN NOT NULL,
	"reported" BOOLEAN NOT NULL,
	"reviewer_name" VARCHAR(255) NOT NULL,
	"reviewer_email" VARCHAR(255) NOT NULL,
	"response" VARCHAR(255) NOT NULL,
	"helpfulness" integer NOT NULL,
	CONSTRAINT "Reviews_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "photos" (
	"id" integer NOT NULL,
	"URL" VARCHAR(255) NOT NULL,
	"review_id" integer NOT NULL,
	CONSTRAINT "Photos_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

-- CREATE TABLE "public.Product" (
-- 	"id" serial NOT NULL,
-- 	CONSTRAINT "Product_pk" PRIMARY KEY ("id")
-- ) WITH (
--   OIDS=FALSE
-- );

CREATE TABLE "meta" (
	"id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"value" integer NOT NULL,
	"characteristic_id" integer NOT NULL,
	CONSTRAINT "Meta_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

-- ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_fk0" FOREIGN KEY ("product_id") REFERENCES "Product"("id");

ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("review_id") REFERENCES "reviews"("id");



--create index

