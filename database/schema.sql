DROP DATABASE RatingsAndReviews;
CREATE DATABASE RatingsAndReviews;
CREATE TABLE "public.reviews" (
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

CREATE TABLE "public.Photos" (
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

CREATE TABLE "public.Meta" (
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

ALTER TABLE "public.Photos" ADD CONSTRAINT "Photos_fk0" FOREIGN KEY ("review_id") REFERENCES "Reviews"("id");



--create index

