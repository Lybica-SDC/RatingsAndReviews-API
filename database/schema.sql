CREATE DATABASE rnr;
CREATE TABLE "reviews" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"date" VARCHAR(255) NOT NULL,
	"summary" text NOT NULL,
	"body" text NOT NULL,
	"recommend" BOOLEAN NOT NULL,
	"reported" BOOLEAN DEFAULT FALSE,
	"reviewer_name" VARCHAR(255) NOT NULL,
	"response" text,
	"helpfulness" integer DEFAULT 0,
	"reviewer_email" VARCHAR(255) NOT NULL,
	CONSTRAINT "reviews_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "photos" (
	"id" serial NOT NULL,
	"url" text NOT NULL,
	"review_id" integer NOT NULL,
	CONSTRAINT "photos_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "char_reviews" (
	"id" serial NOT NULL,
	"review_id" integer NOT NULL,
	"characteristic_id" integer NOT NULL,
	"value" integer NOT NULL,
	CONSTRAINT "char_reviews_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "characteristics" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "characteristics_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("review_id") REFERENCES "reviews"("id");

ALTER TABLE "char_reviews" ADD CONSTRAINT "char_reviews_fk0" FOREIGN KEY ("review_id") REFERENCES "reviews"("id");

ALTER TABLE "char_reviews" ADD CONSTRAINT "char_reviews_fk1" FOREIGN KEY ("characteristic_id") REFERENCES "characteristics"("id");
















