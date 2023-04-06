CREATE DATABASE rnr;
CREATE TABLE "reviews" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"date" text NOT NULL,
	"summary" text NOT NULL,
	"body" text NOT NULL,
	"recommend" BOOLEAN NOT NULL,
	"reported" BOOLEAN NOT NULL,
	"reviewer_name" text NOT NULL,
	"reviewer_email" text NOT NULL,
	"response" text NOT NULL,
	"helpfulness" integer NOT NULL,
	CONSTRAINT "Reviews_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "photos" (
	"id" integer NOT NULL,
	"URL" text NOT NULL,
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
	"name" text NOT NULL,
	"value" integer NOT NULL,
	"characteristic_id" integer NOT NULL,
	CONSTRAINT "Meta_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

-- ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_fk0" FOREIGN KEY ("product_id") REFERENCES "Product"("id");

ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("review_id") REFERENCES "reviews"("id");



--create index

