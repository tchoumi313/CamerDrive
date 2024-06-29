package com.example.backend.configs;

import com.example.backend.models.Role;
import com.example.backend.models.*;
import com.example.backend.models.User;
import com.example.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class SeedData implements CommandLineRunner {
    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CoursRepository coursRepo;
    @Autowired
    private ConceptRepository conceptRepo;

    @Autowired
    private QuestionRepository questionRepo;
    @Autowired
    private QuizRepository quizRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepo.count() == 0) {
            Role adminRole = new Role();
            adminRole.setNom("ADMIN");
            adminRole.setDescription("Administrateur");
            roleRepo.save(adminRole);
            Role instRole = new Role();
            instRole.setNom("INSTITUTER");
            instRole.setDescription("Instituteur(rice)");
            roleRepo.save(instRole);
            Role stdRole = new Role();
            stdRole.setNom("STUDENT");
            stdRole.setDescription("Simple utilisateur");
            roleRepo.save(stdRole);
        }
        if (userRepo.count() == 0) {
            User user = new User();
            user.setUsername("admin");
            user.setEmail("admin@admin.com");
            user.setPassword(encoder.encode("P@ssword1"));
            user.setDateNaiss(new SimpleDateFormat("yyyy-MM-dd").parse("2000-01-01"));
            Role role = new Role();
            role.setNom("ADMIN");
            user.setRole(roleRepo.findByNom(AppConstants.ADMIN_ROLE));
            userRepo.save(user);
        }

         if (coursRepo.count() == 0) {
            createCoursAndRelatedData();
        }
    }
        private void createCoursAndRelatedData() {
        // Cours 1: Connaissance de la Route
        Cours cours1 = new Cours();
        cours1.setTitre("Connaissance de la Route");
        cours1.setDescription("Comprendre les différentes parties de la route, les marquages et les signaux routiers.");
        coursRepo.save(cours1);

        addConceptAndQuestionsToCours(cours1, new String[]{
                "Les Différentes Parties de la Route", "La route est composée de plusieurs parties: chaussée, accotement, trottoir, etc.",
                "Les Marquages au Sol", "Les marquages au sol sont essentiels pour guider les usagers et garantir la sécurité.",
                "Les Panneaux de Signalisation", "Les panneaux de signalisation routière indiquent des obligations, des interdictions ou des informations.",
                "Les Feux de Circulation", "Les feux de circulation régulent le trafic aux intersections et sur les passages piétons.",
                "Les Intersections et Priorités", "Les règles de priorité à respecter lors des intersections pour éviter les accidents."
        }, new String[][]{
                {"Quelle partie de la route est réservée aux piétons ?", "La chaussée", "Le trottoir", "L'accotement", "La bande d'arrêt d'urgence", "Le trottoir"},
                {"Que signifie une ligne blanche continue sur la chaussée ?", "Interdiction de franchir ou de chevaucher", "Autorisation de dépasser", "Zone de stationnement", "Route à sens unique", "Interdiction de franchir ou de chevaucher"},
                {"Que signifie un panneau de danger triangulaire avec un bord rouge ?", "Interdiction", "Obligation", "Danger", "Information", "Danger"},
                {"Quels feux doivent être utilisés dans un tunnel ?", "Feux de route", "Feux de croisement", "Feux de brouillard", "Feux de position", "Feux de croisement"},
                {"Quelle est la largeur normale d'une chaussée ?", "3 mètres", "5 mètres", "7 mètres", "9 mètres", "7 mètres"},
                {"Quel est le rôle des marquages au sol ?", "Décoration", "Guidage et sécurité", "Délimitation des propriétés", "Ralentissement des véhicules", "Guidage et sécurité"},
                {"Que signifie un panneau rond à fond bleu ?", "Interdiction", "Obligation", "Danger", "Information", "Obligation"},
                {"Quels véhicules ont la priorité dans une intersection sans signalisation ?", "Véhicules à droite", "Véhicules à gauche", "Véhicules devant", "Véhicules derrière", "Véhicules à droite"},
                {"Que signifie un feu rouge ?", "Passage libre", "Arrêt obligatoire", "Cédez le passage", "Interdiction de tourner", "Arrêt obligatoire"},
                {"Comment indiquer un changement de direction ?", "Avec les feux de détresse", "Avec les clignotants", "Avec les feux de route", "Avec le klaxon", "Avec les clignotants"}
        });

        // Cours 2: Code de la Route
        Cours cours2 = new Cours();
        cours2.setTitre("Code de la Route");
        cours2.setDescription("Apprendre les règles de conduite, les priorités et les sanctions.");
        coursRepo.save(cours2);

        addConceptAndQuestionsToCours(cours2, new String[]{
                "Les Règles de Priorité", "Les règles de priorité déterminent qui a la priorité dans différentes situations routières.",
                "Les Limitations de Vitesse", "Les limitations de vitesse sont imposées pour garantir la sécurité sur les routes.",
                "Les Infractions et Sanctions", "Les infractions au code de la route entraînent des sanctions comme les amendes et les retraits de points.",
                "Les Zones de Danger", "Les zones de danger sont des endroits spécifiques où la vigilance doit être accrue.",
                "Les Types de Permis", "Différents types de permis existent en fonction des véhicules que l'on souhaite conduire."
        }, new String[][]{
                {"Que signifie un panneau stop ?", "Cédez le passage", "Arrêt obligatoire", "Interdiction de tourner à gauche", "Fin de limitation de vitesse", "Arrêt obligatoire"},
                {"Quelle est la vitesse maximale autorisée en agglomération ?", "30 km/h", "50 km/h", "70 km/h", "90 km/h", "50 km/h"},
                {"Quelles sont les conséquences d'un excès de vitesse ?", "Avertissement verbal", "Amende et retrait de points", "Aucune", "Récompense", "Amende et retrait de points"},
                {"Que signifie un panneau indiquant une école ?", "Interdiction de dépasser", "Ralentir et être vigilant", "Arrêt obligatoire", "Passage piétons", "Ralentir et être vigilant"},
                {"Quelle est la sanction pour conduite en état d'ivresse ?", "Amende", "Prison", "Retrait de permis", "Toutes les réponses", "Toutes les réponses"},
                {"Que signifie un panneau rond à bord rouge avec une barre transversale ?", "Interdiction", "Obligation", "Danger", "Information", "Interdiction"},
                {"Quel permis est nécessaire pour conduire un camion ?", "Permis A", "Permis B", "Permis C", "Permis D", "Permis C"},
                {"Que faire en cas d'accident ?", "Fuir", "Aider les blessés et appeler les secours", "Ignorer", "Continuer son chemin", "Aider les blessés et appeler les secours"},
                {"Quelle est la vitesse maximale autorisée sur autoroute ?", "110 km/h", "120 km/h", "130 km/h", "140 km/h", "130 km/h"},
                {"Que signifie un panneau de limitation de vitesse ?", "Vitesse minimale", "Vitesse maximale", "Interdiction de s'arrêter", "Obligation de s'arrêter", "Vitesse maximale"}
        });

            // Cours 3: Conduite Préventive
            Cours cours3 = new Cours();
            cours3.setTitre("Conduite Préventive");
            cours3.setDescription("Apprendre les techniques de conduite préventive pour éviter les accidents.");
            coursRepo.save(cours3);

            addConceptAndQuestionsToCours(cours3, new String[]{
                    "Les Techniques de Conduite Préventive", "Les techniques pour anticiper et éviter les situations dangereuses.",
                    "Les Distances de Sécurité", "Les distances de sécurité à respecter pour éviter les collisions.",
                    "Les Conditions Météorologiques", "Comment adapter sa conduite aux différentes conditions météorologiques.",
                    "Les Véhicules Prioritaires", "Les règles à respecter vis-à-vis des véhicules prioritaires.",
                    "Les Situations d'Urgence", "Comment réagir en cas de situation d'urgence sur la route."
            }, new String[][]{
                    {"Que signifie conduite préventive ?", "Rouler vite", "Anticiper les dangers et les éviter", "Ignorer les autres usagers", "Rouler lentement", "Anticiper les dangers et les éviter"},
                    {"Quelle est la distance de sécurité en ville ?", "10 mètres", "20 mètres", "30 mètres", "40 mètres", "20 mètres"},
                    {"Que faire en cas de pluie ?", "Accélérer", "Ralentir et augmenter la distance de sécurité", "Conduire normalement", "Freiner brusquement", "Ralentir et augmenter la distance de sécurité"},
                    {"Comment réagir face à un véhicule prioritaire en approche ?", "Accélérer", "Ignorer", "Céder le passage", "Klaxonner", "Céder le passage"},
                    {"Quelle est la distance de sécurité sur autoroute ?", "20 mètres", "50 mètres", "100 mètres", "200 mètres", "100 mètres"},
                    {"Comment adapter sa conduite en cas de brouillard ?", "Utiliser les feux de route", "Accélérer", "Ralentir et utiliser les feux de brouillard", "Conduire normalement", "Ralentir et utiliser les feux de brouillard"},
                    {"Que faire en cas de dérapage sur une route glissante ?", "Accélérer", "Freiner brusquement", "Lever le pied de l'accélérateur et diriger dans le sens du dérapage", "Klaxonner", "Lever le pied de l'accélérateur et diriger dans le sens du dérapage"},
                    {"Comment anticiper un danger potentiel sur la route ?", "Accélérer", "Freiner brusquement", "Observer les indices de la route et les autres usagers", "Ignorer les autres usagers", "Observer les indices de la route et les autres usagers"},
                    {"Quelle est la première règle de la conduite préventive ?", "Ignorer les autres usagers", "Conduire lentement", "Être attentif et anticiper les dangers", "Accélérer en toutes circonstances", "Être attentif et anticiper les dangers"},
                    {"Comment réagir en cas de freinage d'urgence ?", "Freiner brusquement et ne pas relâcher", "Relâcher l'accélérateur et freiner progressivement", "Accélérer", "Ignorer le danger", "Relâcher l'accélérateur et freiner progressivement"}
            });

            // Cours 4: Sécurité Routière
        Cours cours4 = new Cours();
        cours4.setTitre("Sécurité Routière");
        cours4.setDescription("Comprendre les mesures de sécurité pour prévenir les accidents.");
        coursRepo.save(cours4);

        addConceptAndQuestionsToCours(cours4, new String[]{
                "Les Équipements de Sécurité", "Importance des équipements comme la ceinture de sécurité et l'airbag.",
                "Les Accidents de la Route", "Statistiques et causes des accidents routiers.",
                "Le Secourisme", "Premiers secours en cas d'accident.",
                "Les Comportements à Risque", "Comportements à éviter pour garantir la sécurité.",
                "Les Campagnes de Prévention", "Rôle des campagnes de sensibilisation à la sécurité routière."
        }, new String[][]{
                {"Quel équipement est essentiel pour protéger le conducteur ?", "Ceinture de sécurité", "Casque", "Gilet de sécurité", "Extincteur", "Ceinture de sécurité"},
                {"Quelle est la première cause des accidents de la route ?", "Vitesse", "Fatigue", "Météo", "Alcool", "Vitesse"},
                {"Que faire si vous êtes témoin d'un accident ?", "Ignorer", "Secourir et appeler les secours", "Fuir", "Prendre des photos", "Secourir et appeler les secours"},
                {"Quel comportement est à éviter en conduisant ?", "Respecter les limitations", "Utiliser le téléphone", "Porter la ceinture", "Observer les panneaux", "Utiliser le téléphone"},
                {"À quoi servent les campagnes de prévention ?", "Encourager la vitesse", "Sensibiliser à la sécurité", "Promouvoir l'alcool au volant", "Ignorer les dangers", "Sensibiliser à la sécurité"},
                {"Quel est l'impact de l'alcool sur la conduite ?", "Amélioration de la concentration", "Diminution des réflexes", "Pas d'effet", "Augmentation de la vigilance", "Diminution des réflexes"},
                {"Pourquoi est-il important de respecter la distance de sécurité ?", "Pour rouler plus vite", "Pour éviter les collisions", "Pour économiser du carburant", "Pour suivre de près", "Pour éviter les collisions"},
                {"Quel est le rôle de l'airbag ?", "Décoration", "Sécurité en cas de collision", "Ranger des objets", "Bloquer la ceinture", "Sécurité en cas de collision"},
                {"Que signifie un panneau de signalisation à fond bleu ?", "Interdiction", "Obligation", "Danger", "Information", "Obligation"},
                {"Quels sont les gestes de premiers secours ?", "Appeler les secours, réconforter, couvrir", "Ignorer, fuir", "Prendre des photos, filmer", "Discuter, argumenter", "Appeler les secours, réconforter, couvrir"}
        });

        // Cours 5: Connaissance du Véhicule
        Cours cours5 = new Cours();
        cours5.setTitre("Connaissance du Véhicule");
        cours5.setDescription("Apprendre les différents composants d'un véhicule et leur entretien.");
        coursRepo.save(cours5);

        addConceptAndQuestionsToCours(cours5, new String[]{
                "Le Moteur", "Comprendre le fonctionnement du moteur et son entretien.",
                "Le Système de Freinage", "L'importance des freins et comment les maintenir.",
                "Les Pneus", "Choix, entretien et pression des pneus.",
                "Les Éclairages", "Différents types de feux et leur utilisation.",
                "Les Fluides du Véhicule", "Importance des fluides pour le bon fonctionnement du véhicule."
        }, new String[][]{
                {"Quel est le rôle principal du moteur ?", "Produire de la chaleur", "Fournir de l'énergie mécanique", "Ranger des objets", "Servir de support", "Fournir de l'énergie mécanique"},
                {"À quoi sert le liquide de frein ?", "Lubrifier le moteur", "Aider à freiner", "Rafraîchir le moteur", "Nettoyer le pare-brise", "Aider à freiner"},
                {"Quelle est la pression recommandée pour les pneus ?", "0.5 bar", "1.5 bar", "2-2.5 bars", "3-3.5 bars", "2-2.5 bars"},
                {"Quels feux utiliser par temps de brouillard ?", "Feux de croisement", "Feux de route", "Feux de brouillard", "Feux de position", "Feux de brouillard"},
                {"Quel fluide est essentiel pour le refroidissement du moteur ?", "Liquide de frein", "Huile moteur", "Liquide de refroidissement", "Essence", "Liquide de refroidissement"},
                {"Pourquoi est-il important de vérifier l'usure des pneus ?", "Pour le confort", "Pour l'économie", "Pour la sécurité", "Pour l'esthétique", "Pour la sécurité"},
                {"Que signifie un voyant rouge sur le tableau de bord ?", "Information", "Avertissement", "Problème critique", "Notification", "Problème critique"},
                {"Quel est l'impact d'un système de freinage défectueux ?", "Confort", "Sécurité réduite", "Esthétique", "Consommation", "Sécurité réduite"},
                {"Quel est le rôle des feux de croisement ?", "Éclairer loin", "Éclairer près sans éblouir", "Signaler un danger", "Décorer", "Éclairer près sans éblouir"},
                {"Pourquoi est-il important de faire la vidange régulièrement ?", "Économie de carburant", "Protéger le moteur", "Esthétique", "Éviter le bruit", "Protéger le moteur"}
        });
    }

    private void addConceptAndQuestionsToCours(Cours cours, String[] concepts, String[][] questions) {
        List<Concept> conceptList = new ArrayList<>();
        for (int i = 0; i < concepts.length; i += 2) {
            Concept concept = new Concept();
            concept.setTitre(concepts[i]);
            concept.setContenu(concepts[i + 1]);
            concept.setCours(cours);
            conceptRepo.save(concept);
            conceptList.add(concept);
        }

        List<Question> questionList = new ArrayList<>();
        for (String[] q : questions) {
            Question question = new Question();
            question.setLibelle(q[0]);
            question.setOption1(q[1]);
            question.setOption2(q[2]);
            question.setOption3(q[3]);
            question.setOption4(q[4]);
            question.setCorrectOption(q[5]);
            questionRepo.save(question);
            questionList.add(question);
        }

        Quiz quiz = new Quiz();
        quiz.setTitre("Quiz de " + cours.getTitre());
        quiz.setCours(cours);
        quiz.setQuestions(questionList);
        quizRepo.save(quiz);
    }
}


