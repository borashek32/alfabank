import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { addCharacter } from 'features/Characters/characters.slice';
import { InputGroup } from 'common/components/InputGroup/InputGroup';
import { Form } from 'common/components/Form/Form';
import { GenderFilterType, SpeciesFilterType, StatusFilterType } from 'features/Characters/characters.types';
import { genderOptions, speciesOptions, statusOptions } from 'common/constants/constants';

type Props = {
  onClose: () => void
}

type FormValues = {
  name: string
  status: StatusFilterType
  species: SpeciesFilterType
  gender: GenderFilterType
  locationName: string
  locationUrl: string
  image: string
  description: string
};

export const AddCharacterForm = ({ onClose }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newCharacter = {
      id: Date.now(),
      name: data.name,
      status: data.status,
      species: data.species,
      gender: data.gender,
      location: {
        name: data.locationName,
        url: data.locationUrl,
      },
      image: data.image,
      likes: 0,
      description: data.description,
    };

    dispatch(addCharacter(newCharacter));
    reset();
    onClose();
  };

  return (
    <Form
      formTitle="Add Character Form" 
      onSubmit={handleSubmit(onSubmit)} 
      buttonTitle="Add Character"
    >
      <InputGroup
        label="Status"
        register={register('status', { required: 'This field is required' })}
        error={errors.status?.message}
        type="select"
        options={statusOptions}
        required
      />
      <InputGroup
        label="Gender"
        type="select"
        register={register('gender', { required: 'This field is required' })}
        error={errors.gender?.message}
        options={genderOptions}
        required
      />
      <InputGroup
       label="Species"
       type="select"
       register={register('species', { required: 'This field is required' })}
       error={errors.species?.message}
       options={speciesOptions}
       required
     />
      <InputGroup
        label="Name"
        type="text"
        register={register('name', { required: 'This field is required' })}
        error={errors.name?.message}
        required
      />
      <InputGroup
        label="Location Name"
        type="text"
        register={register('locationName', { required: 'This field is required' })}
        error={errors.locationName?.message}
        required
      />
      <InputGroup
        label="Location URL"
        type="text"
        register={register('locationUrl')}
      />
      <InputGroup
        label="Image URL"
        type="text"
        register={register('image')}
        error={errors.image?.message}
      />
      <InputGroup
        label="Description"
        register={register('description', { required: 'This field is required' })}
        error={errors.description?.message}
        type="textarea"
        required
      />
    </Form>
  );
};
