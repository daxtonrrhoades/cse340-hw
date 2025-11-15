-- Create Tony Stark account
INSERT INTO public.account (
	account_firstname, 
	account_lastname, 
	account_email, 
	account_password
) 
VALUES (
	'Tony',
	'Stark',
	'tony@starkent.com',
	'Iam1ronM@n'
);

-- update Tony Stark account_type to Admin
UPDATE public.account SET account_type = 'Admin' WHERE account_id = 1;

-- Delete Tony Stark from the account table
DELETE FROM public.account WHERE account_id = 1;

-- Update GM Hummer to read a huge interior
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE inv_id = 10;

-- select make, model, and classification using an inner join between tables
SELECT 
	inventory.inv_make, 
	inventory.inv_model, 
	classification.classification_name 
FROM 
	public.inventory 
JOIN 
	public.classification
ON 
	inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';

-- Update the URLs for the image and thumbnail to contain /vehicles in the middle
UPDATE 
	public.inventory
SET
	inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

